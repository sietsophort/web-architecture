export default function (err, req, res) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
