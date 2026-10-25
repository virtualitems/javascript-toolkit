const patterns = {
    home: '/',
    colors: {
        collection: '/colors',
        create: '/colors/create',
        edit: new URLPattern({ pathname: '/colors/:slug/edit' }),
        item: new URLPattern({ pathname: '/colors/:slug' })
    }
}

Deno.serve((request) => {
    const method = request.method.toUpperCase()
    const url = new URL(request.url)
    let match

    if (method === 'GET') {
        if (url.pathname === patterns.home) {
            return new Response(null, { status: 200 })
        }

        if (url.pathname === patterns.colors.collection) {
            // index
            return new Response(null, { status: 200 })
        }

        if (url.pathname === patterns.colors.create) {
            // create
            return new Response(null, { status: 200 })
        }

        match = patterns.colors.edit.exec(url)

        if (match !== null) {
            const slug = match.pathname.groups.slug
            // edit
            return new Response(slug, { status: 200 })
        }

        match = patterns.colors.item.exec(url)

        if (match !== null) {
            const slug = match.pathname.groups.slug
            // show
            return new Response(slug, { status: 200 })
        }
    }

    if (method === 'POST') {
        if (url.pathname === patterns.colors.collection) {
            // store
            return new Response(null, { status: 204 })
        }
    }

    if (method === 'PATCH') {
        match = patterns.colors.item.exec(url)

        if (match !== null) {
            // update
            return new Response(null, { status: 204 })
        }
    }

    if (method === 'PUT') {
        match = patterns.colors.item.exec(url)

        if (match !== null) {
            // update
            return new Response(null, { status: 204 })
        }
    }

    if (method === 'DELETE') {
        match = patterns.colors.item.exec(url)

        if (match !== null) {
            // destroy
            return new Response(null, { status: 204 })
        }
    }

    return new Response(null, { status: 404 })
})
