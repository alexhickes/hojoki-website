'use client'

export default function Terms() {
  return (
    <section id="terms" className="py-20 bg-black/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Terms of Business</h2>
        <div className="prose prose-invert max-w-none text-gray-400">
          <p className="mb-4">
            Welcome to Hojoki. By using our services, including the Wys X application, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. Acceptance of Terms</h3>
          <p className="mb-4">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">2. User Accounts</h3>
          <p className="mb-4">
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Privacy Policy</h3>
          <p className="mb-4">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Location Data</h3>
          <p className="mb-4">
            Wys X is a location-based service. By using the app, you consent to the collection and sharing of your location data as per your privacy settings within the application.
          </p>
        </div>
      </div>
    </section>
  )
}
