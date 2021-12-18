#!/bin/bash
# declare an array called array and define 3 values
# to use bash script it must be set to executable
# chmod +x filename.sh

# Download list of images from url

# declare -r url="https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/"

# declare -a imageFileNames=(
# a-box-invaders.jpg
# a-snake.jpg
# balloon-problems.jpg
# cat-meow.jpg
# coconutty.jpg
# debriss.jpg
# dont-let-your-dreams-be-memes.jpg
# emma-3d.jpg
# fly-south.jpg
# galacticdiamond.jpg
# give-space.jpg
# lost-in-cyberspace.jpg
# lost-in-guam.jpg
# lost-in-metaverse.jpg
# lost-in-my-mind.jpg
# lost-in-the-forest-dungeon.jpg
# lost-pacman.jpg
# metamorphosis.jpg
# placeholder.png
# polyhedron-runner.jpg
# prisonri0t.jpg
# she-is-my-universe.jpg
# shifted-dimensions.jpg
# spacewrecked.jpg
# vernissage.jpg
# vr-racing.jpg
# wandering-moon.jpg
# wherewhat.jpg
# world-lost.jpg
# )

declare -r url="https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/icons/"

declare -a imageFileNames=(
icon-128.png
icon-168.png
icon-192.png
icon-256.png
icon-32.png
icon-512.png
icon-64.png
icon-96.png
)

# Loop through filenames and execute wget with url and image file name
for imageFileName in "${imageFileNames[@]}"
do
    wget ${url}${imageFileName}
done

# declare -r url="https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/"
# declare -r fileName="hihi.jpg"

# echo ${url}${fileName}

# wget https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/a-box-invaders.jpg
# wget https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/a-snake.jpg
