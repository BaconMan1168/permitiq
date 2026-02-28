# 10 — Stripe Integration

## Architecture

```
Frontend → POST /payments/checkout → Stripe Checkout Session URL
Stripe → POST /webhooks/stripe → backend verifies signature → updates DB
```

## Checkout Flow Checklist

- [ ] Create Checkout Session server-side (never client-side)
- [ ] Pass `metadata.userId` and `metadata.businessId` in session
- [ ] Return `{ url }` to frontend; frontend redirects
- [ ] Success + cancel URLs configured via env vars

## Checkout Session Template

```ts
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment', // or 'subscription'
  line_items: [...],
  metadata: { userId: req.user.id, businessId },
  success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
  cancel_url: `${process.env.FRONTEND_URL}/pricing`,
})
res.json({ url: session.url })
```

## Webhook Handler Checklist

- [ ] Verify signature: `stripe.webhooks.constructEvent(raw, sig, secret)`
- [ ] Use raw body — do NOT parse JSON before verification
- [ ] Handle `checkout.session.completed` → grant feature access
- [ ] Idempotent — safe to receive same event twice
- [ ] Return `200` quickly; do heavy work after `res.send()`

## Webhook Template

```ts
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  if (event.type === 'checkout.session.completed') {
    // update user/business payment status
  }
  res.send()
})
```

## Feature Gating

- [ ] `isPaid` flag on Business or User record
- [ ] Check flag in backend before returning premium data
- [ ] Frontend reads gating from API response (never trust client-side flag)

## `.env.example` Keys

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
```

## Definition of Done

- [ ] Checkout session created server-side with metadata
- [ ] Webhook verifies Stripe signature before processing
- [ ] `checkout.session.completed` updates DB
- [ ] Feature gating enforced on backend
- [ ] Stripe keys only in `.env` (gitignored)
