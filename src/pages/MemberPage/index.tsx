import { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'


const MemberPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
  <div className="flex flex-row w-full">
    <div className="py-12 flex-1">
      <div className="flex justify-center bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-2xl">
        <div className="2-full p-8 lg:w-1/2">
          <a
            onClick={() => {
              setIsLogin(!isLogin)
            }}
            className="flex justify-center items-center mt-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
          >
              <h2 className="px-4 py-3 w-5/6 text-center font-bold">
                {isLogin ? "Not a member?": "Back to Login"}
              </h2>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b border-red-700 w-1/5 lg:w-1/4"></span>
            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase"
            >
              {isLogin ? "Login" : "Register"}
            </a>
            <span className="border-b w-1/5 border-red-700 lg:w-1/4"></span>
          </div>
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  </div> 
  )
}

export default MemberPage;
