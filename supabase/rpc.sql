-- RPC to increment seller earnings
CREATE OR REPLACE FUNCTION increment_seller_earnings(seller_uuid UUID, amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET earnings_total = earnings_total + amount
  WHERE id = seller_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
