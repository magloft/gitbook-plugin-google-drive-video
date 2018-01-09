# Gitbook Plugin - Google Drive Video
Embed Google Drive videos in your book

This plugins requires gitbook `>=2.0.0`.

## Installation

Add the plugin to your `book.json`, then run `gitbook install`:

```
{
    plugins: ["google-drive-video"]
}
```

You can now add google drive videos to your book:

```
check out this video:

{% gdrive %} https://drive.google.com/file/d/12yyAYTldr82RhGU926Smcs8tFqEJd8al/view?usp=sharing {% gdrive %}
```

The video will automatically placed in a responsive iframe (website) or a link to the video (book version).
