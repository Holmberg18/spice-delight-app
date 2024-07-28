import { useState } from "react"
import { useFormik } from "formik"
import { register } from "@/utils/customerService"
import { useNavigate } from "react-router-dom"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { registerSchema as validationSchema } from "@/schemas/validationSchemas"
import { loginFormStyles as styles } from "@/styles/styles"

const RegisterForm = () => {

  const [submit, setSubmit] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleRegister = async (values: CustomerDetails): Promise<void> => {
    setSubmit(true)
    const registerAttempt: any = await register(values)
    if (registerAttempt) {
      navigate("/login")
    } else {
      setSubmit(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      passwordHash: "",
    },
    validationSchema,
    onSubmit: (values: CustomerDetails) => {
      handleRegister(values)
    },
  });
  const fields: Array<keyof typeof formik.errors> = ["username", "passwordHash", "firstName", "lastName", "phone", "email", "address"];

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
          name="firstName"
          placeholder="First Name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={formik.handleChange}
          value={formik.values.address}
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
          name="passwordHash"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.passwordHash}
          className={styles.input}
        />
        {
          fields.map((field) => (
            formik.errors[field] && (
              <p key={field} className={styles.error}>{formik.errors[field]}</p>
            )
          ))
        }
        <button
            disabled={submit}
            type="submit"
            className={styles.button}
        >
          Register
        </button>
        {submit ? <FontAwesomeIcon className="animate-spin" icon={faSpinner} /> : ""}
      </form>
    </div>
  )
}

export default RegisterForm