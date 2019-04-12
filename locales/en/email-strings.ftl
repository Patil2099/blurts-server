# Firefox Monitor is a product name and should not be translated.
-product-name = Firefox Monitor
# Firefox is a brand name and should not be translated.
-brand-name = Firefox

click-to-verify = 
  Select the Verify My Email button within 24 hours to confirm your Firefox Monitor account. 
  Your report will then be on its way.
verify-my-email = Verify My Email
report-scan-another-email = Scan Another Email in {-product-name}

automated-message = 
  This is an automated email; if you received it in error, no action is required.

# Without HTML markup reads: We sent this message to [user’s email address] because the email address opted into alerts from Firefox Monitor.
we-sent-this-alert = We sent this message to { $userEmail } because the email address opted into alerts from {-product-name}.

unsubscribe-email-link  = 
  If you no longer want {-product-name} alerts, unsubscribe.

# A Firefox Monitor Report is an emailed statement from Firefox Monitor containing a list of known data breaches where the user’s email address was found amongst the stolen data.
firefox-monitor-report = {-product-name} Report 
report-date = Report Date:
email-address = Email Address:

# "full report" should be understood to mean the "complete report" or, the complete list of known data breaches that included the user’s information. 
your-full-report = Here’s your full {-product-name} report, which includes all known data breaches that contain this email address.

report-no-breaches = 
  Your email address did not appear in our database of known breaches. 
  But breaches can happen at anytime. Take these steps to keep your personal data safe online.

# A list of next steps someone should take if their information has been involved in a data breach.
what-to-do-next = What To Do Next

report-headline = 
  { $breachCount ->
      [0] So far, so good.
      [one] Your account appeared in { $breachCount } breach.
     *[other] Your accounts appeared in { $breachCount } breaches.
  }

report-subhead-no-breaches =
  Your account doesn’t appear in our full report of breaches. 
  That’s good news, but there is more you can do. 
  Data breaches happen at any time, so read on to learn how you can protect your passwords.

report-subhead-found-breaches =
  Here’s your full Firefox Monitor report, which includes all known data breaches that contain this email address. 

report-pwt-blurb = 
  Passwords are so valuable, that thousands of them are stolen every day and traded or sold on the black market. 
  Stronger passwords protect your accounts and all the personal information that resides inside them. 

report-pwt-headline-1 = Use a different password for every account
report-pwt-summary-1 = 
  Reusing the same password everywhere opens the door for hackers. 
  They can use that password to log into your other accounts. 

report-pwt-headline-2 = Create strong, unique passwords
report-pwt-summary-2 = 
  Hackers use lists of common passwords to try to guess yours. 
  The longer and more random your password is, the harder it will be to steal.

report-pwt-headline-3 = Treat security questions like extra passwords
report-pwt-summary-3 = 
  Websites don’t check that your answers are accurate, just that they match every time. 
  Create long, random answers and store them somewhere safe.

report-pwt-headline-4 = Use a password manager 
report-pwt-summary-4 = 
  Services like 1Password, LastPass, Dashlane, and Bitwarden generate strong passwords, store them securely, 
  and fill them into websites so you don’t have to remember every single one.

# A link to legal information about mozilla products.
legal = Legal


breach-alert-subject={-product-name} found your email in a new data breach.
your-info-was-discovered-headline=Your information was discovered in a new data breach.
your-info-was-discovered-blurb=You’re signed up to receive Firefox Monitor alerts when your email appears in a data breach. Here’s what we know about this breach.
what-to-do-after-breach=What to do after a data breach

ba-next-step-1= Change your password to a strong, unique password.
ba-next-step-blurb-1=
  A strong password uses a combination of upper and lowercase letters, 
  special characters, and numbers. It doesn’t contain personal info like 
  your address, birthday, or family names.

ba-next-step-2= Stop using that exposed password entirely.
ba-next-step-blurb-2= Stop using that exposed password entirely.
  Cyber criminals could find your password on the dark web and use it 
  to log in to your other accounts. The best way to protect your accounts 
  is to use unique passwords for each one.

ba-next-step-3= Get help creating better passwords and keeping them safe.
ba-next-step-blurb-3=
  Use a password manager to create strong, unique passwords. Password managers securely store all your 
  logins so you can access them across all your devices.

faq1= I don’t recognize this company or website. Why am I in this breach?
faq2= Why did it take so long to notify me of this breach?
faq3= How do I know this is a legitimate email from Firefox Monitor?
