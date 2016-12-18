---
layout: post
tags:
 - design
 - plotting
 - plotlyjs
 - data
 - blogging
---

<span class="emphasis-text"> Another thought</span>, another dollar - I wish.
I've been caught up working on a few things recently. Within the scope of the
past few weeks I've been trying to finish the first draft of a paper that I'm
working on. The paper addresses an idea that I had regarding time-domain
reflectometry and the issue of multiple reflection planes within a device under
test (DUT). However, in writing this paper I've been getting distracted looking
at a number of new plotting libraries, particularly those available in Julia, a
"new" technical computing language. I say "new" because development of Julia
began in [late August of
2009](https://github.com/JuliaLang/julia/commit/a9cbc036ac62dc5ba5200416ca7b40a2f9aa59ea).
But, different animals reach maturity at different rates and Julia has yet to
reach their landmark release indicating stability: v1.0.

Of course, as with all software, the numbering scheme is arbitrary and there's
been a movement in the software community to lesson the use of tags and instead
opt for commit-based versioning.  However, I still see the value in associating
major release versions or milestones in stability with a special number, a tag.
Most of the community seems to agree with me since most people still use tags to
indicate major releases.

However, ridding myself of that earlier tangent, I'd like to talk a bit about
plotting. Plotting is one of the most fundamental features of a scientific
computing library. I'm happy to say that plotting in Julia has made leaps and
bounds since I last seriously considered using Julia (about a year ago). There
are a variety of different plotting backends (which each target different goals)
and this can be seen as confusing and/or annoying. But, it's very easy to
substitute one plotting backend for another to accommodate different goals (like
speed, interactivity, OpenGL, etc.).

I have a vision of eventually integrating a lot more of my data-based thoughts
into this website. For this, I will require figures and the ability to typeset
mathematics - typesetting I'm doing with MathJax, for now, until something
better comes along (native browser rendering!!!!). However, for plots, I don't
want a bunch of clunky assets, like PDFs and PNGs, floating around in my website
history. It makes my figures static and it requires references to external
files, which I don't like as a matter of principle. However, most importantly, I
want my plots to be interactive and vectorized and beautiful. It should be fun
for the visitors of my sight to interact with my data sets and my ideas. If I
can make it fun for you, the reader, to listen to my thoughts, then I've won
this interaction game.

So, just for the sake of demonstrating how easy it will be to include such a
plot in my blog in the future (when I want to do such a thing), consider the
Julia script below.

<figure>
<figcaption>Julia script for the below plot</figcaption>
{% highlight julia linenos %}
using PlotlyJS
p = plot(bar(;y=randn(10)))
savefig(p, "some_fig.html", js=:remote)
{% endhighlight %}
</figure>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="5b7f87c8-364d-4d17-af3d-8c2c5c4e1843" class="plotly-graph-div"></div>

<script>
window.PLOTLYENV=window.PLOTLYENV || {};
Plotly.newPlot('5b7f87c8-364d-4d17-af3d-8c2c5c4e1843', [{"y":[1.0635620069577711,-1.6392691747180077,1.415791484801416,1.196362446820407,-0.4688094992650218,-1.2514311290255427,1.0694414801576146,-0.1530151193610243,2.588927441400016,-0.46501061066027083],"type":"bar"}],
      {"margin":{"r":50,"l":50,"b":50,"t":60}}, {showLink: false});

</script>

Walking through each of the steps of this code we can see that the first line
simply imports the functions provided by
[PlotlyJS.jl](https://github.com/spencerlyon2/PlotlyJS.jl) into the workspace.
PlotlyJS.jl is only one of a number of backends currently available for plotting
in Julia (like [GR.jl](https://github.com/jheinen/GR.jl), [PyPlot.jl](https://github.com/JuliaPy/PyPlot.jl), and [others](juliaplots.github.io)).
The second line in the above script establishes the plot object as a bar plot
with ten random y values. The third line saves that file to disk so that I can
strip out the relevant parts. Inserting that HTML into this blog post results
the following plot. This plot may look different at different points in time
because this plot uses a Javascript library (hosted on a remote server) to
render the plot. However, the Javascript library is subject to being updated,
which means that this plot should always, as long as the remote library is
available, look "good". It's also nice in that it's interactive by default. It's
in the browser and it's rendered using javascript. PlotlyJS renders plots in
SVG. I'm not sure they support canvas rendering which could make these plots
slow for a [very large number of data points](http://stackoverflow.com/questions/28083421/svg-vs-html5-canvas-based-charts). But, I'll cross that bridge when I get to it.

Below, I've included a close approximation (I shorted the div id) to the HTML
source that is rendered by the above script. It's pretty clean. All I had to do
was strip out the \<script\>\</script\> portions and the \<div\> DOM element
where the plot would be rendered and shove that into a markdown file which
Jekyll will use to process the final rendered HTML for this blog post.  It's
pretty slick. In fact, it's worth noting that I naïvely inserted the HTML as
seen above into the first draft of this blog post and it worked just fine.  That
is, the nested \<html\> and \<head\> tags didn't seem to confuse the Jekyll
markdown processor. It removed them for me. However, in my opinion it's bad
taste to allow the processor to remove the unnecessary information.

<figure>
<figcaption>Generated HTML</figcaption>
{% highlight html %}
<html>
<head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <div id="f8072726-e179-4457-8c67" class="plotly-graph-div"></div>
<script>
  window.PLOTLYENV=window.PLOTLYENV || {};
  window.PLOTLYENV.BASE_URL="https://plot.ly";
  Plotly.newPlot(
  'f8072726-e179-4457-8c67',
  [{"y":[1.0635620069577711,-1.6392691747180077,1.415791484801416,
          1.196362446820407,-0.4688094992650218,-1.2514311290255427,
          1.0694414801576146,-0.1530151193610243,2.588927441400016,
          -0.46501061066027083],"type":"bar"}],
    {"margin":{"r":50,"l":50,"b":50,"t":60}},
    {showLink: false});
 </script>

</body>
</html>
{% endhighlight %}
</figure>

This is a decent solution to including the occasional figure/plot in my website.
There may be other Julia libraries that can generate HTML plots, but I like
PlotlyJS. It looks nice, has nice user interactivity features, and it interfaces
well with the Plotly cloud service that allows you to play with the data in a
powerful cloud engine.

Okay, I should probably focus on finishing the first draft of my paper, now.
I think that this has been a good introduction to including plots in my blog.
