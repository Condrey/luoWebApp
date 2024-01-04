"use client";
import Image from "next/image";
import TwitterIcon from "@/assets/twitter.png";
import LinkedinIcon from "@/assets/linkedin.png";
import WhatsAppIcon from "@/assets/whatsapp.png";
import TelegramIcon from "@/assets/telegram.png";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface SocialMediaShareProps {
  text: string;
  url: string;
}

export default function SocialMediaShare({ text, url }: SocialMediaShareProps) {
  const { toast } = useToast();
  const size = 45;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url,
  )}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(text)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${text} ${url}`,
  )}`;
  const tiktokShareUrl = `https://www.tiktok.com/@${encodeURIComponent(url)}`;
  const snapchatShareUrl = `https://www.snapchat.com/add/${encodeURIComponent(
    url,
  )}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(text)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        variant: "default",
        title: "Copied.!",
        description: "Successfully copied link",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
    }
  };

  return (
    <div className="flex gap-3 items-center w-2/3">
      <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={TwitterIcon}
          alt="tweet icons"
          width={size}
          height={size}
          className="dark:invert"
        />
      </Link>
      {/*<Link href={facebookShareUrl} target="_blank" rel="noopener noreferrer">*/}
      {/*    <Image src={FacebookIcon} alt="tweet icons" width={size} height={size} className=''/>*/}
      {/*</Link>*/}
      <Link href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={LinkedinIcon}
          alt="tweet icons"
          width={size}
          height={size}
          className=""
        />
      </Link>
      <Link href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={WhatsAppIcon}
          alt="tweet icons"
          width={size}
          height={size}
          className=""
        />
      </Link>
      {/*<Link href={tiktokShareUrl} target="_blank" rel="noopener noreferrer">*/}
      {/*    <Image src={TikTokIcon} alt="tweet icons" width={size} height={size} className=''/>*/}
      {/*</Link>*/}
      {/*<Link href={snapchatShareUrl} target="_blank" rel="noopener noreferrer">*/}
      {/*    <Image src={SnapChatIcon} alt="tweet icons" width={size} height={size} className=''/>*/}
      {/*</Link>*/}
      <Link href={telegramShareUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={TelegramIcon}
          alt="tweet icons"
          width={size}
          height={size}
          className=""
        />
      </Link>
      <Button
        onClick={handleCopyLink}
        variant="secondary"
        className="bg-white/50 shadow dark:bg-white/20 py-1 px-2"
      >
        <CopyIcon />
      </Button>
    </div>
  );
}
