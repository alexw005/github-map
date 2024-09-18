import { OAUTH_BASE_URL } from "@/lib/helper/constant";
import Image from "next/image";

const LoginPage = () => {
    return (
        <div className="flex flex-column items-center h-screen flex-col justify-center">
            <h1 className="text-xl mb-6">Please click the Login button to continue</h1>
            <a
                className="bg-indigo-600 text-white flex items-center p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                href={`${OAUTH_BASE_URL}/start`}
            >
                <Image
                    src="/images/github-logo.svg"
                    alt="GitHub Logo"
                    className="w-6 h-6 mr-2"
                    width={24}
                    height={24}
                />
                LOGIN with GitHub
            </a>
        </div>
    );
}
export default LoginPage;