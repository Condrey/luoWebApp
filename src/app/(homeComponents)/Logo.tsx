import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo_amuka_singleton_monochrome_neutral.png";
import {webPageName} from "@/lib/constants/Constants";
import {lusitana} from "@/app/ui/fonts";

export default function Logo() {
    return <div>
        <Link href="/" className={` ${lusitana.className} items-center gap-1 hidden  md:flex`}>
            <Image src={logo} alt={"Luo.com logo"} width={20} height={20} className='sepia '/>
            <span className='font-bold text-slate-700 uppercase'>{webPageName}</span>
        </Link>
    </div>
}
