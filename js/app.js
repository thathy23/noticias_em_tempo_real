const galeria = document.getElementById('galeria')

const API_TOKEN = '8447c156f069302d6f9fae22a79d28f1'
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=pt&max=12&token=${API_TOKEN}`

fetch(API_URL)
  .then(res => {
    if (!res.ok) throw new Error('Erro na resposta da API')
    return res.json()
  })
  .then(dados => {
    if (!dados.articles || dados.articles.length === 0) {
      galeria.innerHTML = '<p class="text-warning text-center">Nenhuma notícia encontrada.</p>'
      return
    }

    dados.articles.forEach(noticia => {
      const col = document.createElement('div')
      col.className = 'col-sm-6 col-md-4 col-lg-3'

      const card = `
        <div class="card h-100 shadow-sm">
          <img src="${noticia.image || 'https://via.placeholder.com/400x200?text=Sem+Imagem'}" class="card-img-top" alt="${noticia.title}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${noticia.title}</h5>
            <p class="card-text small">${noticia.description || ''}</p>
            <a href="${noticia.url}" target="_blank" class="btn btn-primary mt-auto">Ler mais</a>
          </div>
        </div>
      `
      col.innerHTML = card
      galeria.appendChild(col)
    })
  })
  .catch(error => {
    galeria.innerHTML = '<p class="text-danger text-center">Erro ao carregar notícias. Tente novamente mais tarde.</p>'
    console.error('Erro ao buscar dados:', error)
  })
