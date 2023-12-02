import {SignIn} from "@clerk/nextjs";
import {Metadata} from "next";

const SignInPage = () => {
    return <div className='flex h-screen items-center justify-center'>
        <SignIn appearance={{variables: {colorPrimary: "#0F172A"}}}/>
    </div>
}

export default SignInPage
export const metadata: Metadata = {
    title: 'Sign In-Luo.com'
}
