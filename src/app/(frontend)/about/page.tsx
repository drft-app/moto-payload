import React from "react"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Moto Tour China",
  description: "Motorcycle tour in China offered by Tanzemoto.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title and Subtitle */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Moto Tour China</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Motorcycle tour in China offered by Tanzemoto.
        </p>
      </div>

      {/* Who are we? Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Who are we?</h2>
        <div className="grid gap-8">
          <div>
            <p className="text-lg mb-4">
              Tanzemoto was established in Oct 2012. We base in Shanghai with an experienced and
              professional team consisting of full-time employee, IIA instructors and ITA tour
              guides. We have rich experience on operating automobile and motorcycle driving
              training and guided tours. Tanzemoto is the official strategic partner of BMW Motorrad
              China on Training and Traveling since 2019. We are the exclusive agency of TWTmoto in
              China, who is official partner of BMW Motorrad.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer? Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What we offer?</h2>
        <div className="flex flex-col space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Training</h3>
            <p className="text-lg">
              Tanzemoto established training course system of BMW Motorrad China Riding Academy
              (BMRA), which includes Safety-Training, Off-road Training, GS Trophy Training Camp,
              Race-Training and IIA/ITA Certified Training. It performed the trainings well, BMRA
              has been recognized as &apos;the most respectable motorcycle training institute in
              China&apos;.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Tour</h3>
            <p className="text-lg mb-4">
              Tanzemoto is operating BMW Motorrad Legendary Tour, which is recognized as &apos;the
              most professional&apos; guided motorcycle tour brand in China.
            </p>
            <p className="text-lg mb-4">
              Tanzemoto developed motorcycle tour products, those provide the participants an
              opportunity to enjoy BMW motocycle&apos;s excellent performance, Marvelous scenery,
              Great Supporting services, Selected fine hotels and Special local cuisines.
            </p>
            <p className="text-lg mb-4">
              We manage an experienced certified tour guide team, who provide Professional scouting,
              guiding, emergency repair and First aid.
            </p>
            <p className="text-lg mb-4">
              SAFETY FIRST! Tanzemoto accumulates practical operating experience on motorcycle tour
              program.
            </p>
            <p className="text-lg">
              We offer service of foreign motorbike rider obtaining{" "}
              <b>Chinese motorcycle driving license</b> before your motorcycle tour in China.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section>
        <p className="text-center mb-8 max-w-3xl mx-auto">
          Please also know more information about us at{" "}
          <a href="http://tanzemoto.com/en/" className="text-blue-500 underline">
            http://tanzemoto.com/en/
          </a>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo0.png"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo1.jpg"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo2.jpg"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo3.webp"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo4.jpg"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-32 h-16 relative">
            <Image
              src="/images/logo5.png"
              alt="Partner Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
