package kookmin.capstone.backend.api;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kookmin.capstone.backend.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = {"S3이미지 업로드 API"})
public class AmazonS3Controller {

    private final S3Uploader s3Uploader;

    @PostMapping("/v1/upload")
    @ApiOperation(value = "이미지 업로드 하면 URL을 줌")
    public String upload(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        return s3Uploader.upload(multipartFile, "thumbnail");
    }
}
