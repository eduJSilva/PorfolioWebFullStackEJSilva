{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fswiss\fcharset0 Helvetica-Bold;}
{\colortbl;\red255\green255\blue255;\red54\green72\blue81;\red255\green255\blue255;\red25\green28\blue31;
}
{\*\expandedcolortbl;;\cssrgb\c27059\c35294\c39216;\cssrgb\c100000\c100000\c100000;\cssrgb\c12941\c14510\c16078;
}
{\*\listtable{\list\listtemplateid1\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{none\}}{\leveltext\leveltemplateid1\'00;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid1}
{\list\listtemplateid2\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{none\}}{\leveltext\leveltemplateid101\'00;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid2}
{\list\listtemplateid3\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{none\}}{\leveltext\leveltemplateid201\'00;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid3}
{\list\listtemplateid4\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{none\}}{\leveltext\leveltemplateid301\'00;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid4}
{\list\listtemplateid5\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{none\}}{\leveltext\leveltemplateid401\'00;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid5}
{\list\listtemplateid6\listhybrid{\listlevel\levelnfc0\levelnfcn0\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{decimal\}.}{\leveltext\leveltemplateid501\'02\'00.;}{\levelnumbers\'01;}\fi-360\li720\lin720 }{\listname ;}\listid6}}
{\*\listoverridetable{\listoverride\listid1\listoverridecount0\ls1}{\listoverride\listid2\listoverridecount0\ls2}{\listoverride\listid3\listoverridecount0\ls3}{\listoverride\listid4\listoverridecount0\ls4}{\listoverride\listid5\listoverridecount0\ls5}{\listoverride\listid6\listoverridecount0\ls6}}
\paperw11900\paperh16840\margl1440\margr1440\vieww23040\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl500\sa120\partightenfactor0

\f0\fs42\fsmilli21330 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 Crear API para bazar\
\pard\pardeftab720\sl320\sa120\partightenfactor0

\f1\b\fs27\fsmilli13736 \cf2 Necesidad:
\f0\b0 \cb1 \
\pard\pardeftab720\sa240\partightenfactor0

\fs30 \cf4 \cb3 \strokec4 Un bazar necesita de una aplicaci\'f3n que le permite realizar el ABML de cada uno de sus productos que tiene en stock.\cb1 \uc0\u8232 \
\pard\pardeftab720\sl320\sa120\partightenfactor0

\f1\b\fs27\fsmilli13736 \cf2 \cb3 \strokec2 Objetivo:
\f0\b0 \cb1 \
\pard\pardeftab720\sa240\partightenfactor0

\fs30 \cf4 \cb3 \strokec4 La creaci\'f3n de una API que, dependiendo del tipo de solicitud que reciba, permita hacer el alta, baja, modificaci\'f3n o lectura de los productos en una base de datos. Para ello tener en cuenta los siguientes endpoints:\cb1 \uc0\u8232 \
\pard\pardeftab720\sa240\partightenfactor0

\f1\b \cf4 \cb3 1.\'a0\'a0\'a0\'a0\'a0\'a0Crear un nuevo producto
\f0\b0 \cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls1\ilvl0\cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0M\'e9todo POST\cb1 \
\ls1\ilvl0\cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0localhost:8080/productos/crear\cb1 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \
\pard\pardeftab720\sa240\partightenfactor0

\f1\b \cf4 \cb3 2.\'a0\'a0\'a0\'a0\'a0\'a0Ver la lista completa de productos
\f0\b0 \cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls2\ilvl0\cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0M\'e9toto GET\cb1 \
\ls2\ilvl0\cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0localhost:8080/productos/traer\cb1 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \
\pard\pardeftab720\sa240\partightenfactor0

\f1\b \cf4 \cb3 3.\'a0\'a0\'a0\'a0\'a0\'a0Eliminar un producto
\f0\b0 \cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls3\ilvl0\cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0M\'e9todo: DELETE\cb1 \
\ls3\ilvl0\cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0 Endpoint:\'a0\'a0localhost:8080/productos/eliminar/\{id\}\cb1 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \
\pard\pardeftab720\sa240\partightenfactor0

\f1\b \cf4 \cb3 4.\'a0\'a0\'a0\'a0\'a0\'a0Modificar un producto
\f0\b0 \cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls4\ilvl0\cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0M\'e9todo: PUT\cb1 \
\ls4\ilvl0\cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0 \'a0Endpoint:\'a0localhost:8080/productos/editar/\{id\}\cb1 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \
\pard\pardeftab720\sa240\partightenfactor0

\f1\b \cf4 \cb3 5.\'a0\'a0\'a0\'a0\'a0\'a0Buscar un producto en particular
\f0\b0 \cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls5\ilvl0\cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0\'a0M\'e9todo: GET\cb1 \
\ls5\ilvl0\cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 		\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 \'b7\'a0\'a0 Endpoint:\'a0\'a0Localhost:8080/productos/traer/\{id\}\cb1 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \
\pard\pardeftab720\sa240\partightenfactor0
\cf4 \cb3 Por otra parte, el bazar tambi\'e9n necesita conocer su producto m\'e1s caro y su producto m\'e1s barato. Para ello necesita desarrollar endpoints que le permitan:\cb1 \
\
\pard\tx220\tx720\pardeftab720\li720\fi-720\partightenfactor0
\ls6\ilvl0
\f1\b \cf4 \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 {\listtext	1.	}\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 Obtener el producto m\'e1s barato.
\f0\b0 \cb1 \
\ls6\ilvl0
\f1\b \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 {\listtext	2.	}\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 Obtener el producto m\'e1s caro.
\f0\b0 \cb1 \
\ls6\ilvl0
\f1\b \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 {\listtext	3.	}\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 Obtener todos los productos ordenados de m\'e1s barato a m\'e1s caro.
\f0\b0 \cb1 \
\ls6\ilvl0
\f1\b \cb3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 {\listtext	4.	}\expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec4 Obtener todos los productos de m\'e1s caro a m\'e1s barato.
\f0\b0 \cb1 \
}