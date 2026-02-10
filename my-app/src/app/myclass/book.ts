export class Book {
    constructor(
        public BookId: string = "",
        public BookName: string = "",
        public Price: number = 0,
        public Image: string = "",
        public Description: string = "",
        public PubDate: string = "",
        public Quantity: number = 0,
        public PublisherId: string = "",
        public TopicId: string = ""
    ) { }
}
