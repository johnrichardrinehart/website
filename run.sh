#!/usr/bin/env bash

nix build .#dev
nix run . -- run --config Caddyfile.dev
