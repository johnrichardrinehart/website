{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        buildInputs = [ pkgs.hugo ];
        hugoBuild = env: pkgs.stdenv.mkDerivation {
          inherit buildInputs;

          name = "website";
          version = "1.0.0";
          src = ./.;
          buildPhase = ''
              hugo --environment ${env}
          '';
          installPhase = ''
              cp -r ./public $out/;
          '';
        };
      in
      rec {
        packages = rec {
          dev = hugoBuild "dev";
          prod = hugoBuild "prod";

          default = dev;
        };

        apps = rec {
          server = {
            program = "${pkgs.caddy}/bin/caddy";
            type = "app";
          };

          default = server;
        };


        devShell = pkgs.mkShell {
          buildInputs = [ pkgs.hugo ];
        };
      });
}
