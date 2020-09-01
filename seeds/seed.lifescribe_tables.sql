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
    'password-one',
    'OneJ@email.com'
  ),
  (
    'Tim',
    'Two',
    'TTwo',
    'password-two',
    'TwoT@email.com'
  ),
  (
    'Jane',
    'Three',
    'JThree',
    'password-three',
    'ThreeJ@email.com'
  ),
  (
    'Mark',
    'Four',
    'MFour',
    'password-four',
    'FourM@email.com'
  ),
  (
    'Louis',
    'Five',
    'LFive',
    'password-five',
    'FiveL@email.com'
  ),
  (
    'Jim',
    'Six',
    'JSix',
    'password-six',
    'SixJ@email.com'
  ),
  (
    'Kevin',
    'Seven',
    'KSeven',
    'password-seven',
    'SevenK@email.com'
  ),
  (
    'Sue',
    'Eight',
    'SEight',
    'password-eight',
    'EightS@email.com'
  ),
  (
    'Pat',
    'Nine',
    'PNine',
    'password-nine',
    'NineP@email.com'
  ),
  (
    'Gina',
    'Ten',
    'GTen',
    'password-ten',
    'TenG@email.com'
  );
  
  INSERT INTO lifescribe_scribes (user_id)
  VALUES
  (1),
  (2),
  (3),
  (4),
  (5),
  (6),
  (7),
  (8),
  (9),
  (10);
  
  INSERT INTO lifescribe_scribbles(scribble_type, scribble_content, scribe_id)
  VALUES
  (0, 'Sample text scribble one', 1),
  (0, 'Sample text scribble two', 2),
  (0, 'Sample text scribble three', 3),
  (0, 'Sample text scribble four', 4),
  (0, 'Sample text scribble five', 5),
  (0, 'Sample text scribble six', 6),
  (0, 'Sample text scribble seven', 7),
  (0, 'Sample text scribble eight', 8),
  (0, 'Sample text scribble nine', 9),
  (0, 'Sample text scribble ten', 10);
  
  COMMIT;