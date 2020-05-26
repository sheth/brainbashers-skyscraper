for i in {1..8}
do 
	curl -s "http://www.brainbashers.com/gifs_tower/d${i}.gif" -o "../skyscrapers_files/img/arrow/d${i}.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/d${i}b.gif" -o "../skyscrapers_files/img/arrow/d${i}b.gif"

	curl -s "http://www.brainbashers.com/gifs_tower/u${i}.gif" -o "../skyscrapers_files/img/arrow/u${i}.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/u${i}b.gif" -o "../skyscrapers_files/img/arrow/u${i}b.gif"

	curl -s "http://www.brainbashers.com/gifs_tower/l${i}.gif" -o "../skyscrapers_files/img/arrow/l${i}.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/l${i}b.gif" -o "../skyscrapers_files/img/arrow/l${i}b.gif"

	curl -s "http://www.brainbashers.com/gifs_tower/r${i}.gif" -o "../skyscrapers_files/img/arrow/r${i}.gif"
	curl -s "http://www.brainbashers.com/gifs_tower/r${i}b.gif" -o "../skyscrapers_files/img/arrow/r${i}b.gif"

done

