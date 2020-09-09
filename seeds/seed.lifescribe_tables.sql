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
  (10, now() - '10 days'::INTERVAL),  
  (1, now() - '2 days'::INTERVAL),
  (2, now() - '3 days'::INTERVAL),
  (3, now() - '4 days'::INTERVAL),
  (4, now() - '5 days'::INTERVAL),
  (5, now() - '6 days'::INTERVAL),
  (6, now() - '7 days'::INTERVAL),
  (7, now() - '8 days'::INTERVAL),
  (8, now() - '9 days'::INTERVAL),
  (9, now() - '10 days'::INTERVAL),
  (10, now() - '11 days'::INTERVAL),  
  (1, now() - '3 days'::INTERVAL),
  (2, now() - '4 days'::INTERVAL),
  (3, now() - '5 days'::INTERVAL),
  (4, now() - '6 days'::INTERVAL),
  (5, now() - '7 days'::INTERVAL),
  (6, now() - '8 days'::INTERVAL),
  (7, now() - '9 days'::INTERVAL),
  (8, now() - '10 days'::INTERVAL),
  (9, now() - '11 days'::INTERVAL),
  (10, now() - '12 days'::INTERVAL);
  
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
  (2, 'Sample audio scribble eleven', 11),
  (1, 'Sample pic scribble twelve', 12),
  (0, 'Sample text scribble thirteen', 13),
  (1, 'Sample pic scribble fourteen', 14),
  (2, 'Sample audio scribble fifteen', 15),
  (3, 'Sample video scribble sixteen', 16),
  (2, 'Sample audio scribble seventeen', 17),
  (1, 'Sample pic scribble eighteen', 18),
  (0, 'Sample text scribble nineteen', 19),
  (1, 'Sample pic scribble twenty', 20),
  (0, 'Sample text scribble twenty-one', 21),
  (1, 'Sample pic scribble twenty-two', 22),
  (2, 'Sample audio scribble twenty-three', 23),
  (3, 'Sample vid scribble twenty-four', 24),
  (2, 'Sample audio scribble twenty-five', 25),
  (1, 'Sample pic scribble twenty-six', 26),
  (0, 'Sample text scribble twenty-seven', 27),
  (1, 'Sample pic scribble twenty-eight', 28),
  (2, 'Sample audio scribble twenty-nine', 29),
  (3, 'Sample vid scribble thirty', 30),
  (2, 'Sample audio scribble thirty-one', 1),
  (1, 'Sample pic scribble thirty-two', 2),
  (0, 'Sample text scribble thirty-three', 3),
  (1, 'Sample pic scribble thirty-four', 4),
  (2, 'Sample audio scribble thirty-five', 5),
  (3, 'Sample video scribble thirty-six', 6),
  (2, 'Sample audio scribble thirty-seven', 7),
  (1, 'Sample pic scribble thirty-eight', 8),
  (0, 'Sample text scribble thirty-nine', 9),
  (1, 'Sample pic scribble fourty', 10),
  (0, 'Sample text scribble fourty-one', 11),
  (1, 'Sample pic scribble fourty-two', 12),
  (2, 'Sample audio scribble fourty-three', 13),
  (3, 'Sample vid scribble fourty-four', 14),
  (2, 'Sample audio scribble fourty-five', 15),
  (1, 'Sample pic scribble fourty-six', 16),
  (0, 'Sample text scribble fourty-seven', 17),
  (1, 'Sample pic scribble fourty-eight', 18),
  (2, 'Sample audio scribble fourty-nine', 19),
  (3, 'Sample vid scribble fifty', 20),
  (2, 'Sample audio scribble fifty-one', 21),
  (1, 'Sample pic scribble fifty-two', 22),
  (0, 'Sample text scribble fifty-three', 23),
  (1, 'Sample pic scribble fifty-four', 24),
  (2, 'Sample audio scribble fifty-five', 25),
  (3, 'Sample video scribble fifty-six', 26),
  (2, 'Sample audio scribble fifty-seven', 27),
  (1, 'Sample pic scribble fifty-eight', 28),
  (0, 'Sample text scribble fifty-nine', 29),
  (1, 'Sample pic scribble sixty', 30);
  
  COMMIT;