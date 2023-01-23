const resolvers = {
    Query: {
      books: () => books,
      book: (_, { id }) => find(books, { id: id }),
      author: (_, { id }) => find(authors, { id: id }),
    },
    Mutation: {
     addBook: (_, {title, cover_image_url, average_rating, authorId }) => {
        book_id++;
  
        const newBook = {
          id: book_id,
          title,
          cover_image_url,
          average_rating,
          author_id
        };
  
        books.push(newBook);
        return newBook;
      }
    },
    Author: {
      books: (author) => filter(books, { authorId: author.id }),
    },
    Book: {
      author: (book) => find(authors, { id: book.authorId }),
    },
  };