export default function Summary({ formData }) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone || 'Not provided'}</p>
  
        <h2 className="text-xl font-semibold mt-6">Location</h2>
        <p>Country: {formData.country}</p>
        <p>City: {formData.city}</p>
  
        <h2 className="text-xl font-semibold mt-6">Payment Details</h2>
        <p>Card Number: **** **** **** {formData.cardNumber.slice(-4)}</p>
        <p>Expiry Date: {formData.expiryDate}</p>
        <p>Billing Address: {formData.billingAddress}</p>
      </div>
    )
  }