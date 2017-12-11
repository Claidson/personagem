function Iniciar(){
	//criando as variáveis globais, necessárias para a composição da cena
	var scene, camera, renderer;

	//criando a cena
	scene = new THREE.Scene();
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	//criando o renderizador e aidcionando no DOM
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);

	//criando a câmera
	camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
	camera.position.set(0,-6,0);
	scene.add(camera);

	//adicionando listener para ajustar o tamanho do render de acordo com o tamanho na janela
	window.addEventListener('resize', function(){
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	//definindo dor de fundo da cena
	renderer.setClearColor(0x333F47, 1);

	//criando a luz
	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100,200,100);
	scene.add(light);

	//carregando modelo e adicionando na cena
//	var loader = new THREE.ColladaLoader();
//
//	loader.options.convertUpAxis = false;
//
//	loader.load( 'male/male_survivor.dae', function ( collada ){
//	    var dae = collada.scene;
//
//		dae.position.set(0,6,-20);//x,y,z- se você souber as dimensões e posições no Blender ;)
//		//dae.scale.set(0.5,0.5,0.5);//reduzir o tamanho em escala pela metade, em todas as dimensões
//
//		scene.add(dae);
//	});
    
 
    // instanciando loader


// var loader = new THREE.ObjectLoader();
// loader.load('steve.json',
// 	function( obj ){ scene.add( obj );
//                   });

//     var loader = new THREE.ObjectLoader();
//
// // load a resource
//     loader.load(
//
//         // resource URL
//         'steve.json',
//
//         // Function when resource is loaded
//         function ( geometry, materials ) {
//
//              var material = materials;
//              var object = new THREE.Mesh( geometry, material );
//
//             scene.add( object );
//
//         }
//     );

// var loader = new THREE.JSONLoader();
// 				loader.load( 'steve/steve.json', function ( geometry, materials ) {
// 					// adjust color a bit
// 					var material = materials[ 0 ];
// 					material.morphTargets = true;
// 					material.color.setHex( 0xffaaaa );
// //					for ( var i = 0; i < 729; i ++ ) {
// 						var mesh = new THREE.Mesh( geometry, materials );
// 						// random
// //						var x = ( ( i % 27 )  - 13.5 ) * 2 + THREE.Math.randFloatSpread( 1 );
// //						var z = ( Math.floor( i / 27 ) - 13.5 ) * 2 + THREE.Math.randFloatSpread( 1 );
// //						mesh.position.set( x, 0, z );
// //						var s = THREE.Math.randFloat( 0.00075, 0.001 );
// //						mesh.scale.set( s, s, s );
// //						mesh.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );
// //						mesh.matrixAutoUpdate = false;
// //						mesh.updateMatrix();
// 						scene.add( mesh );
// //						mixer.clipAction( geometry.animations[ 0 ], mesh )
// //								.setDuration( 1 )			// one second
// //								.startAt( - Math.random() )	// random phase (already running)
// //								.play();					// let's go
// //					}
// 				} );


   function pc() {
       var texture = THREE.ImageUtils.loadTexture('pc.jpg')
       var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
       var sprite = new THREE.Sprite( spriteMaterial );
       sprite.scale.set( 10, 10, 1 )
       scene.add( sprite );
   }

    function perin() {
        var texture = THREE.ImageUtils.loadTexture('bots/2/perin2.png')
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture,   } );
        var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set(3, 3, 1 )
        return  sprite ;
    }

	//controle de orbita da câmera
	var cameraOrbit = 0;

	//foco da lente
	var ORIGIN = new THREE.Vector3(0,6,-20);

	//função para controlar a renderização da cena
	function render(){
        //perin();
        // pc();
         var peri = perin();
        peri.position.x = 2;
        peri.position.y = 2;
        peri.position.z = 2;
		scene.add(peri);

		//rotacionando a câmera
//		cameraOrbit += 0.001;
//		camera.position.x = Math.cos(cameraOrbit) * 100;
//		camera.position.y = Math.cos(cameraOrbit) * 100;
//		camera.position.z = Math.cos(cameraOrbit) * 100;
        				var timer = Date.now() * 0.0005;
				camera.position.x = Math.cos( timer ) * 10;
				camera.position.y = 20;

				camera.position.z = Math.sin( timer ) * 10;

		camera.lookAt(scene.position );

		//renderizando a cena
		renderer.render( scene, camera );

		//executando recursivamente
		requestAnimationFrame(render);
	}

	//executando a função de renderização
	render();
}