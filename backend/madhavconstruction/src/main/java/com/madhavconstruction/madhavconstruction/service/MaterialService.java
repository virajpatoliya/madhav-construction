package com.madhavconstruction.madhavconstruction.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.madhavconstruction.madhavconstruction.model.KharchaModel;
import com.madhavconstruction.madhavconstruction.model.MaterialModel;
import com.madhavconstruction.madhavconstruction.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
    public class MaterialService {
    public MaterialService(MaterialRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private MaterialRepository repository;

    public MaterialModel addMaterial(MaterialModel material) {

        if (material.getCompany() != null) {
            material.setCompany(material.getCompany().trim().toLowerCase()); // normalize
        }
        return repository.save(material);
    }


    public List<MaterialModel> getAllMaterial() {
        return repository.findAll();
    }

    public int getTotalMoney() {
        return repository.findAll().stream()
                .mapToInt(MaterialModel::getMoney)
                .sum();
    }


    public Page<MaterialModel> getMaterial(String company, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").ascending());

        if (company != null && !company.isEmpty()) {
            return repository.findByCompanyContainingIgnoreCase(company, pageable);
        } else {
            return repository.findAll(pageable);
        }
    }

    public byte[] generateMaterialPdf(List<MaterialModel> material) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font CompanyFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 28);
            Paragraph Companytitle = new Paragraph("Madhav Constructions", CompanyFont);
            Companytitle.setAlignment(Element.ALIGN_CENTER);
            document.add(Companytitle);

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Material Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Font dateFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 12);
            String downloadDate = "("+ LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))+")";
            Paragraph dateParagraph = new Paragraph(downloadDate, dateFont);
            dateParagraph.setAlignment(Element.ALIGN_CENTER);
            document.add(dateParagraph);
            document.add(Chunk.NEWLINE);


            // Table setup
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2,2,5,3,3,3});

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            // Headers
            table.addCell(new PdfPCell(new Phrase("S.No", headFont)));
            table.addCell(new PdfPCell(new Phrase("Date", headFont)));
            table.addCell(new PdfPCell(new Phrase("Company", headFont)));
            table.addCell(new PdfPCell(new Phrase("Description", headFont)));
            table.addCell(new PdfPCell(new Phrase("Number", headFont)));
            table.addCell(new PdfPCell(new Phrase("Money", headFont)));

            // Data rows

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            int index = 1;
            double total = 0;
            for (MaterialModel k : material) {
                table.addCell(String.valueOf(index++));
                table.addCell(k.getDate() != null ? k.getDate().format(formatter) : "-"); // ✅ formatted date
                table.addCell(k.getCompany());
                table.addCell(k.getDescription());
                table.addCell(String.valueOf(k.getNumber()));
                table.addCell(String.valueOf(k.getMoney())); // ✅ use getMoney()
                total += k.getMoney();
            }

            // Total row
            PdfPCell totalCell = new PdfPCell(new Phrase("Total", headFont));
            totalCell.setColspan(4); // spans first 4 columns
            totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalCell);

            PdfPCell totalValue = new PdfPCell(new Phrase(String.format("%.2f", total), headFont));
            totalValue.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalValue);

            // Add table to document
            document.add(table);
            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error while generating PDF", e);
        }
    }



    public MaterialModel updateMaterial(String id, MaterialModel updatedMaterial) {
        Optional<MaterialModel> existing = repository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Material record not found with ID: " + id);
        }

        MaterialModel material = existing.get();

        // Update only non-null fields
        if (updatedMaterial.getCompany() != null)
            material.setCompany(updatedMaterial.getCompany().trim().toLowerCase());
        if (updatedMaterial.getDescription() != null)
            material.setDescription(updatedMaterial.getDescription());
        if (updatedMaterial.getDate() != null)
            material.setDate(updatedMaterial.getDate());
        if (updatedMaterial.getMoney() != 0)
            material.setMoney(updatedMaterial.getMoney());
        if (updatedMaterial.getNumber() != 0)
            material.setNumber(updatedMaterial.getNumber());

        return repository.save(material);
    }

    // ✅ DELETE
    public void deleteMaterial(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Material record not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}



