"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authActionGithub, authActionGoogle } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginCard() {
  const [errorMessageGithub, dispatchGithub] = useFormState(
    authActionGithub,
    ""
  );
  const [errorMessageGoogle, dispatchGoogle] = useFormState(
    authActionGoogle,
    ""
  );
  return (
    <>
      <form action={dispatchGoogle} className="space-y-4">
        <LoginButtonGoogle />
      </form>
      <form action={dispatchGithub} className="space-y-4 mt-3">
        <LoginButtonGithub />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>New To ChatCode? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/signup"
        >
          Sign Up
        </Link>
        {errorMessageGithub ? (
          <p className="test-sm text-red-700">{errorMessageGithub}</p>
        ) : null}
        {errorMessageGoogle ? (
          <p className="test-sm text-red-700">{errorMessageGoogle}</p>
        ) : null}
      </div>
    </>
  );
}

function LoginButtonGithub() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full flex gap-2" disabled={pending}>
      <Image src={"/github.svg"} width={20} height={20} alt="Github logo" /> Log
      in with Github
    </Button>
  );
}

function LoginButtonGoogle() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full flex gap-2"
      variant={"outline"}
      disabled={pending}
    >
      <Image
        src={"/google-color-icon.svg"}
        width={20}
        height={20}
        alt="Google logo"
      />{" "}
      Login up with Google
    </Button>
  );
}
