import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { ClientSecretCredential, ChainedTokenCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const vaultUrl = process.env.AZURE_VAULT_URL;
const secretName = "spice-delight-app-api-key";

// Setup credentials
const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const credentialChain = new ChainedTokenCredential(firstCredential);
const client = new SecretClient(vaultUrl, credentialChain);

app.use(express.json()); // Middleware to parse JSON bodies

const getSecretKey = async () => {
  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    console.error('Error fetching secret:', error);
    throw new Error('Error fetching secret');
  }
};

const fetchRecipe = async (id) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching recipe');
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
};

const fetchProduct = async (id) => {
  try {
    const apiKey = await getSecretKey();
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const fetchProducts = async () => {
  try {
    const apiKey = await getSecretKey();
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const getStripeKey = async (keyName) => {
  try {
    const apiKey = await getSecretKey();
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Stripe/${keyName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching Stripe key');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Stripe key:', error);
  }
};

const createOrder = async (customerId, totalAmount, items) => {
  try {
    const apiKey = await getSecretKey();
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    const orderDetails = { "customerID": customerId, "totalAmount": totalAmount, orderDate: timestamp, "status": 0, "items": items };
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(orderDetails)
    });

    if (!response.ok) {
      throw new Error('Error creating order');
    }

    const data = await response.json();
    console.log("Order created");
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const credentials = { username, password };
  try {
    const apiKey = await getSecretKey();
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Customer/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Error logging in');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/register', async (req, res) => {
  const credentials = req.body;
  try {
    const apiKey = await getSecretKey();
    const response = await fetch(`${process.env.VITE_SPICE_DELIGHT_API_URL}Customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Error creating user');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await fetchRecipe(id);
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

app.get('/api/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await fetchProduct(id);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/stripe/:keyName', async (req, res) => {
  const { keyName } = req.params;
  try {
    const stripeKey = await getStripeKey(keyName);
    res.json(stripeKey);
  } catch (error) {
    console.error('Error fetching Stripe key:', error);
    res.status(500).json({ error: 'Error fetching Stripe key' });
  }
});

app.post('/api/order', async (req, res) => {
  const { customerId, totalAmount, items } = req.body;
  try {
    const order = await createOrder(customerId, totalAmount, items);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
