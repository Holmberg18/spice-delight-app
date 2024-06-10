import { useFormik } from 'formik'
import * as Yup from 'yup'


const styles: Styles = {
    login: "w-360px pt-8 mx-auto",
    form: "relative z-10 bg-white rounded-lg max-w-360px mx-auto mb-100px p-45 text-center",
    input: "outline-none bg-gray-200 w-full border-0 rounded-md mb-3 p-3 box-border text-sm focus:bg-gray-300",
    button: "uppercase outline-none bg-blue-600 w-full border-0 rounded-md p-3 text-sm transition-all duration-300 ease-in-out cursor-pointer active:bg-blue-800",
    span: "text-4xl text-blue-600 mb-6 block",
    error: "ml-4 mt-1 text-left text-red-500 text-xs"
  }

const validationSchema = Yup.object().shape({
username: Yup.string()
    .required("Username is a required field")
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters'),
email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const RegisterForm = () => {

    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
        },
        validationSchema,
        onSubmit: (values) => {
          // Handle form submission here
          console.log('Form submitted with values:', values);
        },
        // Add validation schema if needed
      });

      
    return (
        <div className={styles.login}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <span className={styles.span}>Register</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={styles.input}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={styles.input}
            />
            {formik.errors.username && (
              <p className={styles.error}>{formik.errors.username}</p>
            )}
            {formik.errors.password && (
              <p className={styles.error}>{formik.errors.password}</p>
            )}
            <button
              type="submit"
              className={styles.button}
            >
              Login
            </button>
          </form>
        </div>
      )
}

export default RegisterForm