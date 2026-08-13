#import <Foundation/Foundation.h>
#import <PDFKit/PDFKit.h>

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        if (argc != 2) {
            fprintf(stderr, "Usage: merge-question-pdfs <pdf-directory>\n");
            return 64;
        }

        NSString *directoryPath = [NSString stringWithUTF8String:argv[1]];
        NSURL *directoryURL = [NSURL fileURLWithPath:directoryPath isDirectory:YES];
        NSURL *outputURL = [directoryURL URLByAppendingPathComponent:@"set12-all-questions.pdf"];
        PDFDocument *mergedDocument = [[PDFDocument alloc] init];

        for (NSInteger question = 1; question <= 30; question += 1) {
            NSString *filename = [NSString stringWithFormat:@"set12-question-%02ld.pdf", (long)question];
            NSURL *sourceURL = [directoryURL URLByAppendingPathComponent:filename];
            PDFDocument *sourceDocument = [[PDFDocument alloc] initWithURL:sourceURL];
            PDFPage *page = [sourceDocument pageAtIndex:0];

            if (sourceDocument == nil || page == nil) {
                fprintf(stderr, "Unable to read %s\n", sourceURL.path.UTF8String);
                return 66;
            }

            [mergedDocument insertPage:page atIndex:mergedDocument.pageCount];
        }

        mergedDocument.documentAttributes = @{
            PDFDocumentTitleAttribute: @"คณิตศาสตร์ 12* (ค 33206) | ชุดที่ 12",
            PDFDocumentAuthorAttribute: @"ครูนพพล สุขภิรมย์",
            PDFDocumentSubjectAttribute: @"โจทย์พัฒนาทักษะ A-Level คณิตศาสตร์ ชุดที่ 12",
            PDFDocumentCreatorAttribute: @"A-Level Math Practice PDF Generator",
        };

        if (![mergedDocument writeToURL:outputURL]) {
            fprintf(stderr, "Unable to write %s\n", outputURL.path.UTF8String);
            return 73;
        }

        printf("Created vector PDF: %s\n", outputURL.path.UTF8String);
    }

    return 0;
}
