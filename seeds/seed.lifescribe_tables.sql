BEGIN;

INSERT INTO
  lifescribe_users (
  first_name,
  last_name,
  user_name,
  password,
  email
)
VALUES
  (
    'John',
    'One',
    'JOne',
    '$2a$11$q5xJtsRSj1RJ1R6tTQOFVezlP5k/p4oSmptkWwG9WntsLb95YHaeO',
    'OneJ@email.com'
  ),
  (
    'Tim',
    'Two',
    'TTwo',
    '$2a$11$yEBMQ89kNQlIDxDJRBqdSujvO2/OUJOdwV//Z9HksGypYYbAPLPFC',
    'TwoT@email.com'
  ),
  (
    'Jane',
    'Three',
    'JThree',
    '$2a$11$Lxo5ZN1sTH/.nzIIGORlbePDO9IbVpPtw3Jg7s4Hwz7mMLCRC6Pfa',
    'ThreeJ@email.com'
  ),
  (
    'Mark',
    'Four',
    'MFour',
    '$2a$11$9oQV8dzoIEAW9NekVmYyA.Nx75W4VjE1U4SVH3pvAUlwLtIFmYfl6',
    'FourM@email.com'
  ),
  (
    'Louis',
    'Five',
    'LFive',
    '$2a$11$tv3IkrZpKynYK3.gUq.ZaOVf8vFf5TgLPT0NDBu9GRXDjBFgXrIqe',
    'FiveL@email.com'
  ),
  (
    'Jim',
    'Six',
    'JSix',
    '$2a$11$xWE4v5LU9kMH6X7Lj5PSTeNK9qJi3YNEmoLftsh9SkzGkz0QbSDoG',
    'SixJ@email.com'
  ),
  (
    'Kevin',
    'Seven',
    'KSeven',
    '$2a$11$VuJyliriOFQUKDHiOGwwz..To9Rc3DQFd4t6mkvB3ZRDgRtqPcabO',
    'SevenK@email.com'
  ),
  (
    'Sue',
    'Eight',
    'SEight',
    '$2a$11$2.frdQ8FRLyPBlGUNaDJp.XkHCczcVOy2itJU/HUIRt2P.89oVAUa',
    'EightS@email.com'
  ),
  (
    'Pat',
    'Nine',
    'PNine',
    '$2a$11$B/YZe0MaMDhcZB.Cmj6MkOuvS0weDYSUyjXxwl.jpHPz5tfEY.TOS',
    'NineP@email.com'
  ),
  (
    'Gina',
    'Ten',
    'GTen',
    '$2a$11$fp8hPUfllPE6urXgkYctSe37LgaOXOpNUxNbB8HdxzvFelBAvFPjm',
    'TenG@email.com'
  );
  
  INSERT INTO lifescribe_scribes (user_id, date_created)
  VALUES
  (1, now() - '1 days'::INTERVAL),
  (2, now() - '2 days'::INTERVAL),
  (3, now() - '3 days'::INTERVAL),
  (4, now() - '4 days'::INTERVAL),
  (5, now() - '5 days'::INTERVAL),
  (6, now() - '6 days'::INTERVAL),
  (7, now() - '7 days'::INTERVAL),
  (8, now() - '8 days'::INTERVAL),
  (9, now() - '9 days'::INTERVAL),
  (10, now() - '10 days'::INTERVAL);
  
  INSERT INTO lifescribe_scribbles(scribble_type, scribble_content, scribe_id)
  VALUES
  (0, 'Sample text scribble one', 1),
  (1, 'Sample pic scribble two', 2),
  (2, 'Sample audio scribble three', 3),
  (3, 'Sample vid scribble four', 4),
  (2, 'Sample audio scribble five', 5),
  (1, 'Sample pic scribble six', 6),
  (0, 'Sample text scribble seven', 7),
  (1, 'Sample pic scribble eight', 8),
  (2, 'Sample audio scribble nine', 9),
  (3, 'Sample vid scribble ten', 10),
  (2, 'Sample audio scribble eleven', 1),
  (1, 'Sample pic scribble twelve', 2),
  (0, 'Sample text scribble thirteen', 3),
  (1, 'Sample pic scribble fourteen', 4),
  (2, 'Sample audio scribble fifteen', 5),
  (3, 'Sample video scribble sixteen', 6),
  (2, 'Sample audio scribble seventeen', 7),
  (1, 'Sample pic scribble eighteen', 8),
  (0, 'Sample text scribble nineteen', 9),
  (1, 'Sample pic scribble twenty', 10);
  
  COMMIT;