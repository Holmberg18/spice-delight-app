import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Props {
  styles: any
}

export const LoginForm = ({styles}: Props) => (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
        >
          <Form>
            <label className={styles.label} htmlFor='Email'>
              Email
            </label>
            <Field className={styles.field} id='email' name='email' />
            <ErrorMessage component='a' className={styles.errorMsg} name='email' />
            <label className={styles.label} htmlFor='Email'>
              Password
            </label>
            <Field className={styles.field} id='password' name='password' />
            <ErrorMessage
              component='a'
              className={styles.errorMsg}
              name='password'
            />
            <div className='mt-8'>
              <button type='submit' className={styles.button}>
                Login
              </button>
            </div>
          </Form>
        </Formik>
    </>
)