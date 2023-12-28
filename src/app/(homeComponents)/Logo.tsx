import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Transparent Backgrounds (1).png";
import {webPageName} from "@/lib/constants/Constants";
import {lusitana} from "@/app/ui/fonts";

export default function Logo() {
    return <div>
        <Link href="/" className={` ${lusitana.className} items-center gap-1 `}>
            <Image src={logo} alt={"Luo.com logo"} width={60} height={60} className=' '/>
            <span className='font-bold text-slate-700 uppercase'>{webPageName}</span>
        </Link>
    </div>
}
