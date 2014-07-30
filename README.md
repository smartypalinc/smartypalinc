smartypal.com
===============

http://www.smartypal.com is currently being served as a static site on Amazon S3 in the "www.smartypal.com" bucket.

S3 is currently configured to serve the index.html file as the homepage and the /css/style.min.css and /js/smarty.min.js files. Be sure when making edits to update minifications accordingly.

To deploy on S3
---------------

Clone this repo on a *nix machine and install and configure [s3cmd](http://s3tools.org/s3cmd):

```
$ sudo apt-get install s3cmd
$ s3cmd --configure
```

Use config values:

Access Key | Secret Key | HTTPS
--- | --- | ---
AKIAJFTCM6WM3WUVH4OQ | nCPlnwu9p/63LIb8AI51bnNvf7vmVZercjYN9hYe | yes

Then, from your machine, run:
```s3cmd sync CLONED-LOCAL-REPO/ s3://www.smartypal.com/```

You can alternatively use the `put` or `get` commands (see [documentation](http://s3tools.org/s3cmd-sync)).

Nameserver configuration
------------------------

Currently, GoDaddy is set to forward `http://smartypal.com` to `http://www.smartypal.com` and the NS records for `www.smartypal.com` have been set to the configuration provided by Amazon Route 53. This means Amazon Route 53 manages the `www` subdomain, but GoDaddy is still the place to configure all other records (e.g., MX records for Google Apps).

To RESET this configuration so that Amazon Route 53 is not being use at all, simply delete the 4 NS records with host = `www` in the GoDaddy dashboard (and add a new CNAME record to point to the new website).
