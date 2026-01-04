import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import React from "react";

export default function PrivacyPage() {
	return (
		<div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
			<Header />
			<main className="flex-1">
				<div className="container mx-auto px-4 py-12">
					<div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>

						<p className="text-gray-700 dark:text-gray-300 mb-6">Effective date: <strong>15 March 2024</strong></p>

						<p className="text-gray-700 dark:text-gray-300 mb-6">
							At VishalTechZone we respect your privacy. This page summarises the personal data we collect, why we collect it, and how you can control it.
						</p>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Information we collect</h2>
							<ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
								<li>Contact details you provide (name, email, message).</li>
								<li>Usage data such as IP, pages visited and device info (for analytics).</li>
								<li>Optional profile information if you create an account.</li>
							</ul>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">How we use it</h2>
							<ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
								<li>To operate and improve the site and its content.</li>
								<li>To respond to your messages and provide support.</li>
								<li>To send occasional updates and announcements if you opt in.</li>
							</ul>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cookies & third parties</h2>
							<p className="text-gray-700 dark:text-gray-300">
								We use cookies and third-party services (e.g., Google) for analytics and advertising. You can control cookies in your browser settings.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your rights</h2>
							<p className="text-gray-700 dark:text-gray-300">Depending on your jurisdiction you may request access, correction, deletion, or portability of your personal data. We will respond within one month.</p>
						</section>

						<div className="mt-6 border-l-4 border-orange-500 bg-orange-50 dark:bg-gray-800 p-4 rounded">
							<p className="text-sm text-gray-800 dark:text-gray-200">Questions or requests? Email us at <a className="font-medium text-orange-600" href="mailto:business@vishaltechzone.com">business@vishaltechzone.com</a></p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
