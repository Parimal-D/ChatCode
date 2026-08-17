import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authActionGithub, authActionGoogle } from "@/lib/actions";

export default function SignupCard() {
  return (
    <>
      <form action={authActionGoogle} className="space-y-4">
        <SignUpButtonGoogle />
      </form>
      <form action={authActionGithub} className="space-y-4 mt-3">
        <SignUpButtonGithub />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </>
  );
}

function SignUpButtonGithub() {
  return (
    <Button className="w-full flex gap-2">
      <Image src={"/github.svg"} width={20} height={20} alt="Github logo" />{" "}
      Sign up with Github
    </Button>
  );
}

function SignUpButtonGoogle() {
  return (
    <Button className="w-full flex gap-2" variant={"outline"}>
      <Image
        src={"/google-color-icon.svg"}
        width={20}
        height={20}
        alt="Google logo"
      />{" "}
      Sign up with Google
    </Button>
  );
}
