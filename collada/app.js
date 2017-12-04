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
	camera.position.set(0,-8,0);
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
    


//var loader = new THREE.ObjectLoader();
//loader.load("steve/steve.json",function ( pessoa ) {
//     scene.add( pessoa );
//});
//    
    // instanciando loader
var loader = new THREE.JSONLoader();


loader.load(

	// resource URL
	'steve/steve.json',

	// Function when resource is loaded
	function ( geometry, materials ) {

		var material = materials[ 0 ];
		var pessoa = new THREE.Mesh( geometry, material );

		scene.add( pessoa );

	}
);


	//controle de orbita da câmera
	var cameraOrbit = 0;

	//foco da lente
	var ORIGIN = new THREE.Vector3(0,6,-20);

	//função para controlar a renderização da cena
	function render(){
		//rotacionando a câmera
		cameraOrbit += 0.001;
		camera.position.x = Math.cos(cameraOrbit) * 100;
		camera.position.y = Math.cos(cameraOrbit) * 100;
		camera.position.z = Math.cos(cameraOrbit) * 100;
		camera.lookAt(ORIGIN);

		//renderizando a cena
		renderer.render( scene, camera );

		//executando recursivamente
		requestAnimationFrame(render);
	}

	//executando a função de renderização
	render();
}