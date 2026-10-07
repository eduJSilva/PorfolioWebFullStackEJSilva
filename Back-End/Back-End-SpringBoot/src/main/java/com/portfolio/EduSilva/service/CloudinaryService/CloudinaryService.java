package com.portfolio.EduSilva.service.CloudinaryService;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(@Value("${app.cloudinary.cloud-name}") String cloudName,
                             @Value("${app.cloudinary.api-key}") String apiKey,
                             @Value("${app.cloudinary.api-secret}") String apiSecret) {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true));
    }

    public Map uploadPortada(MultipartFile multipartFile) throws IOException {
        return upload(multipartFile, new Transformation().quality("auto").fetchFormat("auto").flags("lossy")
                .background("auto").gravity("auto").height(400).width(1000).crop("fill_pad"));
    }

    public Map uploadFoto(MultipartFile multipartFile) throws IOException {
        return upload(multipartFile, new Transformation().quality("auto").fetchFormat("auto")
                .gravity("face").height(400).width(400).crop("thumb"));
    }

    public Map uploadProyectoImagenes(MultipartFile multipartFile) throws IOException {
        return upload(multipartFile, new Transformation().quality("auto").fetchFormat("auto")
                .width(1200).crop("limit"));
    }

    public Map delete(String id) throws IOException {
        return cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
    }

    private Map upload(MultipartFile multipartFile, Transformation transformation) throws IOException {
        File file = Files.createTempFile("upload-", "-" + sanitize(multipartFile.getOriginalFilename())).toFile();
        try {
            multipartFile.transferTo(file);
            return cloudinary.uploader().upload(file, ObjectUtils.asMap("transformation", transformation));
        } finally {
            Files.deleteIfExists(file.toPath());
        }
    }

    private static String sanitize(String name) {
        return name == null ? "file" : name.replaceAll("[^A-Za-z0-9._-]", "_");
    }
}
