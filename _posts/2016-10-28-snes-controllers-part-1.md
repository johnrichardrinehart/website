---
layout: post
---

<span class="emphasis-text"> Welcome, back, reader. </span> So far, I'm
averaging a bit over 11 days between posts. That's not the greatest rate. But,
let's not dwell on my failures. Let's talk about one of my recent struggles - or, as I like to
think of them: unfinished successes :).

I'm a product of the 90s. I'm also a product of small town, rural America. These
two factors made Nintendo's SNES (TM) a core component of my childhood
development. Zelda: A Link to the Past, Super Bomberman, Super Mario World,
Donkey Kong Country and Super Mario Kart (and other games that I'm sure I'd
remember if I saw them) collectively absorbed a large part of my youth. I'm sure
that I've spent more than 300 hours playing all of those games (about an hour a
day for a little under a year). That's almost two straight weeks. I guess it's
really not that much time, but it definitely left a mark on me.

To resurrect the spirit of my childhood and provide some entertainment for me
and my friends I purchased 4 SNES USB controllers on eBay. They were only ~$5
each with free shipping (allow 4-6 weeks for delivery). When these are paired up
with an SNES emulator (Snes9x, currently) the 8-bit magic really comes to life.
The graphics, though, on a 60-inch flatscreen leave much to be desired. Rainbow
Road is seizure-inducing and Bowser's Castle is disorienting.  Thankfully, the
emulator comes with some low-pass filters that smooth out the graphics to dull
the transitions in color.

Okay, but here's the rub: When the controllers are inserted the operating system
(Ubuntu 16.04, currently) assigns device files to each "joystick" (js). For
example, the first SNES controller inserted may be assigned /dev/input/js0, the
second controller may be assigned /dev/input/js1, etc. Now, I have to tell
Snes9x, the emulator, which controller is associated with which "player" in the
game. You do this before starting to play any game. So, one *could* insert the
four controllers on some day, configure Snes9x to associate /dev/input/js0 →
joystick 4, /dev/input/js2 → joystick 1, /dev/input/js1 → joystick 2, and
/dev/input/js3 → joystick 3, for example. If that person decided to never
unplug the controllers then this should work forever. However, if tomorrow the
person unplugs and re-plugs in the controllers in a different order then that
person will have to reconfigure the joystick mapping in Snes9x. That's a real
pain.

Now, if we could distinguish between the controllers at the time of insertion,
then we maybe could use some joystick library or the operating system itself to
configure the joysticks without having to use the interface of Snes9x. However,
all of the joysticks were made in China in the same factor. They have the same
Vendor ID numbers and Product ID numbers (usually, the only numbers that
distinguish USB devices). So, that isn't going to work.

However, I have noticed that Snes9x (technically Snes9x-gtk) configures an XML
file in ~/.snes9x (~/.snes9x/snes9x.xml) with the information about the
joysticks after a user clicks "apply" on the Snes9x user interface after
configuring the controller(s). The XML file stores information about which key
to associate with "Up" on "Joystick 1" and "B" on "Joystick 2", etc. The
information about these keypresses (stored as some number hashed from the
keypress itself and the device number (js1, js0, etc.)) only depends on the
order in which the joystick was installed. These numbers don't change with
time and/or cycles of the joystick ("cycling" = "unplugging and plugging in the
joystick"). So, I could just store these numbers and copy them, manually, into
the XML file before launching the emulator. But, there is a better (more
automated) way.

Introducing udev. udev is the device manager for the linux kernel. It's the guy
that tells the operating system that devices (printers, mice, joysticks,
webcams, etc.) have been attached to the computer. You can configure udev to
trigger scripts to run when certain devices are plugged in. This is what I'm
going to use udev for. I will detect when a controller has been plugged in and
then I'll write to the XML file that stores the information about the joystick
mapping. Then, no one has to worry about configuring Snes9x with information
about the joysticks. It's done on their behalf.

It's getting late and I wanted to meet up some friends at a party (9 John). So,
I'm going to take off, for now. Part 2 is coming!
