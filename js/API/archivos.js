var f = {
	txt: null,

	action: null,

	createFile: function(){
		f.txt = $('#aSend').val();
		f.action = 0;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail);

	},

	readFile: function(){
		f.action = 1;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail);
	},

	//-------- FUNCIONES PARA ESCRIBIR Y LEER ----------

	gotFS: function(fileSystem) {
		if(f.action == 0 ){
			// Vamos a escribir
			fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, f.gotFileEntry, f.fail);
		
		}else{
			// Vamos a leer
			 fileSystem.root.getFile("readme.txt", null, f.gotFileEntry, f.fail);
		}
    },
    
    gotFileEntry: function(fileEntry) {
    	if(f.action == 0){
    		// Vamos a escribir
        	fileEntry.createWriter(f.gotFileWriter, f.fail);
    	}else{
    		// Vamos a leer
    		fileEntry.file(f.gotFileReader,f.fail);
    	}
    },

    gotFileWriter: function(writer) {
        writer.onwriteend = function(evt) {
        	alert("Archivo escrito");
        };
        writer.write(f.txt);
    },

	gotFileReader: function(file){
		var reader = new FileReader();
        reader.onloadend = function(evt) {
            $('#aGet').text(evt.target.result);
        };
        reader.readAsText(file);
	},

    fail: function(error) {
        alert(error.code);
    }
};
