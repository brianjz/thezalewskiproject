# Milwaukee Death Index
 
## Back story
While working on my own genealogy and family history research, I spent a lot of time paging through old Milwaukee newspapers when they were available via Google. I kept running across death notices and obituaries, but Google's OCR never transcribed them since they were so small and sometimes hard-to-read. I started a spreadsheet with the basics as I looked through papers to hopefully post somewhere at some point.

One thing led to another, and I put the data I collected in a MySQL database. At that point, I wanted to try something new (to me) and wrote up a small site using Backbone.js and a PHP API backend [on another site of mine](https://www.thezalewskiproject.com/) that I called "The Milwaukee Death Index." That lived for many years, mostly dormant since access to old newspapers is no longer free via Google. 

## Today
Recently, I wanted to learn Node.js and React and I work better when I'm working on something solid, not just an "example blog site", etc. I decided to rewrite this site. My host didn't support Node (at least not a somewhat recent version), so I also learned a bit of Microsoft Azure hosting.

It's now built using Node.js and Express, React, and a MongoDB database. 

Current URL is [located at Microsft Azure](https://thezalewskiproject.azurewebsites.net/)