# Import necessary libraries
from flask import Flask, request, jsonify
import stripe

# Initialize Flask app
app = Flask(__name__)

# Initialize Stripe with your Secret Key
stripe.api_key = 'sk_test_51NppkRIrrzXCgiDEt4vR7IBLLEpIUXsepYrrUBGVnwshef0TjBwvhSKiU1Xsye6NN2fvQBoHuv6tyw28ptuY8rS200ZcWamYeK'  # Replace with your actual Secret Key

# Define a route to create a Payment Intent
@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        # Get product details from the request
        data = request.get_json()
        product_name = data['product']
        price_in_cents = data['price']  # Price in cents

        # Create a Payment Intent
        payment_intent = stripe.PaymentIntent.create(
            amount=price_in_cents,
            currency='usd',
            description=f'Purchase of {product_name}'
        )

        # Return the client secret to the client-side for payment confirmation
        return jsonify({'clientSecret': payment_intent.client_secret})

    except Exception as e:
        return jsonify(error=str(e)), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(port=3000)
