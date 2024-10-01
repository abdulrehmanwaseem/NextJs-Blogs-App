import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextEffect } from "./text-animation";

export const HeroPage = () => {
  return (
    <div className="relative isolate -mt-10 mb-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e33259] to-[#ff80b5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl py-40">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-neutral-400 hover:ring-neutral-500">
            Announcing our next round of funding.
            <a href="#" className="font-semibold text-rose-600">
              <span aria-hidden="true" className="absolute inset-0" /> Read more{" "}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl mx-2 font-bold tracking-tight sm:text-6xl">
            <TextEffect per="word" preset="blur">
              Welcome to blogger online content platform
            </TextEffect>
          </h1>
          <p className="mt-6 mx-4 text-lg leading-8 text-neutral-500">
            <TextEffect per="word" as="span" preset="slide">
              Welcome to our blogging platform, where your ideas come to life.
              Join our community and start sharing your unique experiences and
              insights with world.
            </TextEffect>
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/server">Get started</Link>
            </Button>
            <Link href="/client" className="text-sm font-semibold leading-6">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#e33259] to-[#ff80b5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};
