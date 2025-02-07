'use client'
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";


export default function FooterComp() {
  return (
    <Footer container className="bg-emerald-100">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="my-2">
            <Footer.Brand src="Logo.png" alt="Logo" className="h-[10rem] rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title="about" className="text-black font-bold" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-black">Flowbite</Footer.Link>
                <Footer.Link href="#" className="text-black">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-black font-bold" />
              <Footer.LinkGroup col>
                <Footer.Link href="/#" className="text-black">Github</Footer.Link>
                <Footer.Link href="#" className="text-black">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-black font-bold" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-black">Privacy Policy</Footer.Link>
                <Footer.Link href="#" className="text-black">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Didar Abbas & team" year={2025} className="text-black font-bold"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-black" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-black"/>
            <Footer.Icon href="#" icon={BsTwitter} className="text-black"/>
            <Footer.Icon href="#" icon={BsGithub} className="text-black"/>
            <Footer.Icon href="#" icon={BsDribbble} className="text-black"/>
          </div>
        </div>
      </div>
    </Footer>
  )
}
