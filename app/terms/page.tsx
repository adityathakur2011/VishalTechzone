import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import React from "react";

export default function TermsPage() {
	return (
		<div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
			<Header />
			<main className="flex-1">
				<div className="container mx-auto px-4 py-12">
					<div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms &amp; Conditions</h1>

						<p className="text-gray-700 dark:text-gray-300 mb-6">These terms explain the rules for using VishalTechZone. By using the site you agree to these terms. If you disagree, please stop using the site.</p>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Use of site</h2>
							<p className="text-gray-700 dark:text-gray-300">You may view and share content for personal, non-commercial use only. Do not post illegal, defamatory or infringing material.</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Intellectual property</h2>
							<p className="text-gray-700 dark:text-gray-300">All content is owned or licensed by VishalTechZone. You must not republish or redistribute content without permission.</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comments & user content</h2>
							<p className="text-gray-700 dark:text-gray-300">User comments are the responsibility of their authors. We may moderate or remove content that breaches these terms.</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Limitation of liability</h2>
							<p className="text-gray-700 dark:text-gray-300">To the extent permitted by law, we are not liable for losses arising from your use of the site. The site is provided "as is".</p>
						</section>

						<div className="mt-6 border-l-4 border-orange-500 bg-orange-50 dark:bg-gray-800 p-4 rounded">
							<p className="text-sm text-gray-800 dark:text-gray-200">Questions about these terms? Email <a className="font-medium text-orange-600" href="mailto:business@vishaltechzone.com">business@vishaltechzone.com</a></p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
