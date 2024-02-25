

var Languages = { // Traduções de paginas para EN, PT e ES
    "pt": {
        "NotFound": {
            "Title": "Pagina não encontrada",
            "Button": 'Voltar ao início',
        },
        "Home": {
            "TitleFreeGame": 'Epic games jogos gratís',
            "TitleNews": 'Última notícia',
            "NewsType": 'Tema',
            'NotFoundLinks': 'não há nenhum link.',
            "NotFoundNews": 'Nenhuma notícia encontrada.',
            "ViewNews": "Ver todas as notícias",
            "ReportBug": "Relatar algum bug/erro",

            "EpicCardFree": "GRATÍS AGORA",
            "EpicCardComing": "GRATÍS EM BREVE",
        },
        "News": {
            "TitleNews": 'Últimas notícias',
            "NewsType": 'Tema',
            'NotFoundLinks': 'não há nenhum link.',
        },
        "Search": {
            "GameNotSale":"Não esta a venda ou é gratís",

            "SearchInfo":" Pesquisa dos jogos baseada nas lojas ",

            "PriceCoin":"Moeda",

            //Steam
            "SteamNotFunction":"Pequisa pelo Steam ainda não esta disponivel :c",
            
            // Epic
            "ErrorMsgPart1":"Algo deu errado",
            "ErrorMsgPart2":"Desculpe",

            "notFoundGame":"Nenhum game encontrado :c",

            "Loading":"Carregando",
        }
    },
    "en": {
        "NotFound": {
            "Title": "Page not found",
            "Button": 'Back to start',
        },
        "Home": {
            "TitleFreeGame": 'Epic games free games',
            "TitleNews": 'Latest news',
            "NewsType": 'Theme',
            'NotFoundLinks': 'there is no link.',
            "NotFoundNews": 'No news found.',
            "ViewNews": "See all news",
            "ReportBug": "Report a bug/error",

            "EpicCardFree": "FREE NOW",
            "EpicCardComing": "FREE COMING SOON",
        },
        "News": {
            "TitleNews": 'Latest news',
            "NewsType": 'Theme',
            'NotFoundLinks': 'there is no link.',
        },
        "Search": {
            "GameNotSale":"It is not for sale or is it free",

            "SearchInfo":" Game search based on stores: ",

            "PriceCoin":"Coin",

            //Steam
            "SteamNotFunction":"Steam search is not yet available :c",
            
            // Epic
            "ErrorMsgPart1":"Something went wrong,",
            "ErrorMsgPart2":"sorry",

            "notFoundGame":"No games found :c",

            "Loading":"Loading",
        }
    },
    'es': {
        "NotFound": {
            "Title": "Página no encontrada",
            "Button": 'De regreso al comienzo',
        },
        "Home": {
            "TitleFreeGame": 'Epic games juegos gratis',
            "TitleNews": 'Última noticia',
            "NewsType": 'Tema',
            'NotFoundLinks': 'no hay ningún vínculo.',
            "NotFoundNews": 'No se encontraron noticias.',
            "ViewNews": "Ver todas las noticias",
            "ReportBug": "Informar un error",

            "EpicCardFree": "LIBRE AHORA",
            "EpicCardComing": "GRATIS PRÓXIMAMENTE",
        },
        "News": {
            "TitleNews": 'Últimas noticias',
            "NewsType": 'Tema',
            'NotFoundLinks': 'no hay ningún vínculo.',
        },
        "Search": {
            "GameNotSale":"No está a la venta o es gratis",

            "SearchInfo":" Búsqueda de juegos basada en tiendas: ",

            "PriceCoin":"Moneda",

            //Steam
            "SteamNotFunction":"La búsqueda de Steam aún no está disponible :c",
            
            // Epic
            "ErrorMsgPart1":"Algo salió mal,",
            "ErrorMsgPart2":" lo siento",

            "notFoundGame":"No se encontraron juegos :c",

            "Loading":"Cargando",
        }
    },
}

export {Languages} // Exportando Languages


const FIREBASE_API_KEY = process.env.REACT_APP_FIRABSE_KEY


export {FIREBASE_API_KEY}