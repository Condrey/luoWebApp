import {SignUp} from "@clerk/nextjs";
import {Metadata} from "next";

const SignUpPage = () => {
    return <div className='flex h-screen items-center justify-center'>
        <SignUp appearance={{variables: {colorPrimary: "#0F172A"}}}/>
    </div>
}

export default SignUpPage
export const metadata: Metadata = {
    title: 'Sign Up-Luo.com'
}
