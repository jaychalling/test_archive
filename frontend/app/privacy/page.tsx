import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-slate-500 mb-4 text-sm">Last updated: 2025-12-24</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. Data Collection</h2>
                <p>Test Archive provides assessment tools. We do not require account registration. Test answers are processed to provide results and may be stored locally or within the URL for sharing purposes.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. Google Analytics & Cookies</h2>
                <p>We use Google Analytics to analyze traffic. Google may use cookies to collect anonymous data about your visit. You can opt-out via browser settings.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Medical Disclaimer</h2>
                <p>The results provided by our tests are for informational purposes only and do not constitute professional medical advice, diagnosis, or treatment.</p>
            </section>

            <p className="text-sm text-slate-400 mt-12 italic">For any questions, contact us at support@test-archive.com</p>
        </div>
    );
}
