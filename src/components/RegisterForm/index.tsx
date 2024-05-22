import { Formik, Field, Form } from 'formik'

interface Props {
    styles: any
}

export const RegisterForm = ({styles}: Props) => (
    <>
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2))
            }}
        >
            <Form>
                <label className={styles.label} htmlFor='Name'>
                    Full Name
                </label>
                <Field className={styles.field} id='name' name='name' />

                <label className={styles.label} htmlFor='Email'>
                    Email
                </label>
                <Field className={styles.field} id='email' name='email' />

                <label className={styles.label} htmlFor='Password'>
                    Password
                </label>
                <Field type='password' className={styles.field} id='Password' name='Password' />
                <div className='mt-8'>
                    <button type='submit' className={styles.button}>
                        Register
                    </button>
                </div>
            </Form>
        </Formik>
    </>
)