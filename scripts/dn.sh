for i in {1..8}
do 
	curl -s "http://www.brainbashers.com/gifs_tower/d$i.gif" -o "../skyscrapers_files/img/d$i.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/u$i.gif" -o "../skyscrapers_files/img/u$i.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/l$i.gif" -o "../skyscrapers_files/img/l$i.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/r$i.gif" -o "../skyscrapers_files/img/r$i.gif"

done

