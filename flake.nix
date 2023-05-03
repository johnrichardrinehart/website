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
      in
      rec {
        packages = {
          hugo-build = pkgs.stdenv.mkDerivation {
            inherit buildInputs;

            name = "website";
            version = "1.0.0";
            src = ./.;
            buildPhase = ''
              hugo
            '';
            installPhase = ''
              cp -r $PWD/public $out/;
            '';
          };
        };
        defaultPackage = packages.hugo-build;

        devShell = pkgs.mkShell {
          buildInputs = [ pkgs.hugo ];
        };
      });
}
