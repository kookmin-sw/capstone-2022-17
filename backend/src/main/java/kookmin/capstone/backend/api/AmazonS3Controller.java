package kookmin.capstone.backend.api;


import kookmin.capstone.backend.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AmazonS3Controller {

    private final S3Uploader s3Uploader;

    @PostMapping("/v1/upload")
    public String upload(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        return s3Uploader.upload(multipartFile, "thumbnail");
    }
}
